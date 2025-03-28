<script setup lang="ts">
import { ref } from 'vue';
import Card from './components/Card.vue';
import CardSlot from './components/CardSlot.vue';

// Num of cards to display
const totalCards = 3;

const previousCardIndex = ref<number>(0);
const currentCardIndex = ref<number>(0);

// Transition state
const transitioning = ref(false);

function getTarget(e: MouseEvent) {
  previousCardIndex.value = currentCardIndex.value;

  if (e.shiftKey) {
    // Go back a card/stay at 0 if at first card. 
    currentCardIndex.value = Math.max(0, currentCardIndex.value - 1);
  } else {
    // Go forward a card/stay at last card if at last card.
    currentCardIndex.value = Math.min(totalCards - 1, currentCardIndex.value + 1);
  }

  transitioning.value = true;

  return `card-slot-${currentCardIndex.value}`;
}

/**
 * Ran after the transition transition is finished/card stops moving.
 */
function onTransitionEnd() {
  transitioning.value = false;
}


function getTimingFunction() {
  if (currentCardIndex.value === 0) {
    return 'ease-in';
  } else if (currentCardIndex.value === 1) {
    return 'cubic-bezier(0.680, -0.550, 0.265, 1.550)';
  } else if (currentCardIndex.value === 2) {
    return 'ease-in-out';
  }

  return 'ease-out';
}

function getDurationMs() {
  if (currentCardIndex.value === 0) {
    return 300;
  } else if (currentCardIndex.value === 1) {
    return 1000;
  } else if (currentCardIndex.value === 2) {
    return 450;
  }

  return 300;
}
</script>

<template>
  <div class="w-screen h-screen min-h-screen flex flex-col items-center justify-center">
    <div class="flex flex-row items-center justify-center gap-12">
      <div v-for="(_, index) in totalCards" :key="index" class="relative w-32 h-48 odd:-top-6 even:top-6">
        <CardSlot 
          v-mover-target="`card-slot-${index}`" 
          v-if="transitioning || currentCardIndex !== index" 
        />

        <!-- `target` here can a string or a function that returns a string. 
          Note that since `getTarget` takes a MouseEvent, we pass it as a function and
          do not just run it like `getTimingFunction` and `getDurationMs`. --> 
        <Card
          v-mover="{ target: getTarget, afterClick: onTransitionEnd, transition: { timingFunction: getTimingFunction(), durationMs: getDurationMs() } }"
          v-if="(currentCardIndex === index && !transitioning) || ( transitioning && previousCardIndex === index )"
        />
      </div>
    </div>
    <div class="flex flex-col *:w-fit pt-12 items-center text-slate-600 dark:text-slate-300">
      <span class="mb-6 opacity-75"><kbd>Shift + Click</kbd> to move card backwards.</span>

      <code class="bg-slate-500/25 p-1 rounded-md mb-2 text-lg">vue-move-directives</code>
      <span class="mb-4 text-lg">View on <a href="https://npmjs.org/package/vue-move-directives" target="_blank" class="text-[#CC3534]/85">NPM</a> | <a href="https://github.com/ImDarkTom/vue-move" class="text-[#4183C4]/85" target="_blank">GitHub</a></span>

      <span class="opacity-90">View <a href="https://github.com/ImDarkTom/vue-move-directives-demo" class="text-[#4183C4]" target="_blank">this demo on GitHub</a></span>
    </div>
  </div>
</template>