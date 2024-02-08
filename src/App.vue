<script setup lang="ts">
import CourseTitle from "@/courses/presentation/ui/components/CourseTitle.vue";
import CoursesTables from "@/courses/presentation/ui/views/CoursesTables.vue"
</script>

<template>
  <section class="w-full flex flex-col items-center justify-center p-8">
    <CourseTitle title="Welcome to Courses" />
    <div class="w-1/2">
        <CoursesTables />
    </div>
  </section>
</template>
