<script lang="ts" setup>
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider
</script>

<template>
  <pre>{{ user?.name }}</pre>
</template>
