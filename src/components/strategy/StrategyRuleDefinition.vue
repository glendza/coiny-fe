<template>
<div class="rule-definition">
  <div class="bg-lighter-dark bg-gradient p-1" @click="toggleExpand">
    <span>{{ documentation.name }}</span>
  </div>
  <div
    class="overflow-hidden"
    :class="{ 'collapsed': !isExpanded }"
  >
    <table class="rule-definition__documentation table-dark table-bordered w-100">
      <tr>
        <td class="align-top p-1">Name</td>
        <td class="p-1 ps-4 text-warning fw-bold codelike">{{ name }}</td>
      </tr>
      <tr>
        <td class="align-top p-1">Description</td>
        <td class="p-1 ps-4">{{ documentation.description }}</td>
      </tr>
      <tr>
        <td class="align-top p-1">Arguments</td>
        <td class="p-1 ps-4">
          <table class="rule-definition__args-table table table-bordered table-primary w-100 text-center">
            <tr>
              <th class="p-1">name</th>
              <th class="p-1">type</th>
              <th class="p-1">required</th>
              <th class="p-1">default</th>
              <th class="p-1">description</th>
            </tr>
            <tr v-for="arg in documentation.arguments" :key="arg.name">
              <td class="p-1 align-top text-warning fw-bold codelike">{{ arg.name }}</td>
              <td class="p-1 align-top">{{ arg.type }}</td>
              <td class="p-1 align-top">
                <span v-if="arg.required" class="p-0">
                  <i class="bi bi-check bg-dark h5"></i>
                </span>
                <span v-else class="p-0">
                  <i class="bi bi-x bg-dark h5"></i>
                </span>
              </td>
              <td class="align-top">{{ arg.default || 'N/A' }}</td>
              <td class="text-start align-top">{{ arg.description || 'N/A' }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script setup lang="ts">
import useToggler from '@/composables/toggler';
import { FunctionDocumentation } from '@/types/rules';

defineProps({
  name: String,
  documentation: FunctionDocumentation
});

const { isToggledOn: isExpanded, toggle: toggleExpand } = useToggler(false);
</script>

<style lang="scss" scoped>
.collapsed {
  max-height: 0;
}

.rule-definition__args-table {
  border-color: transparent;
}
</style>
