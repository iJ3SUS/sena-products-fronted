
<template>
    <Browse 
        create_route="users.create"
        resource_url="dashboard/users"
        :limit="10"
    >
        <template #content="{ loading, items, pagination }">
            <Table>
                <template #top>
                    <div class="pt-6 p-4 flex gap-2">
                        <Text 
                            v-model="query.search"
                            label="Buscar"
                            placeholder="Buscar por nombre o identificación y pulsa enter"
                            size="h-10"
                            @enter="search"
                        />
                    </div>
                </template>
                
                <template #head>
                    <Row>
                        <Column class="text-left w-1/4">
                            Nombre
                        </Column>
                        <Column class="text-left w-1/4">
                            Email
                        </Column>
                        <Column class="text-center w-20">
                            Estado
                        </Column>
                        <Column class="text-center w-28">
                            F. Creado
                        </Column>
                        <Column class="text-center w-28">
                            F. Actualizado
                        </Column>
                        <Column class="text-center w-24">
                            Acciones
                        </Column>
                    </Row>
                </template>
    
                <template #body>
                    <Row v-for="(user, index) in items" class="hover:bg-gray-50 transition-colors">
                        <Column>
                            <div class="flex gap-2 items-center">
                                <Avatar :name="user.name" size="md" />
                                <div class="flex flex-col">
                                    <span class="text-gray-900 leading-tight">
                                        {{ user.name }} {{ user.last_name }}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        CC {{ user.identification }}
                                    </span>
                                </div>
                            </div>
                        </Column>
                        <Column class="w-1/4">
                            <div class="flex items-center gap-2">
                                <Icon class="text-gray-400" icon="Mail" width="16" height="16" />
                                <span class="text-gray-900 truncate text-xs" :title="user.email">
                                    {{ user.email }}
                                </span>
                            </div>
                        </Column>
                        <Column class="text-center w-20">
                            <div class="flex items-center justify-center">
                                <StatusBadge :active="user.active" />
                            </div>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ user.created_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ user.created_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="text-center text-xs w-28">
                            <div class="space-y-1">
                                <div class="font-semibold text-gray-900">
                                    {{ user.updated_at.toFormat('dd/MM/yyyy') }}
                                </div>
                                <div class="text-gray-500">
                                    {{ user.updated_at.toFormat('HH:mm') }}
                                </div>
                            </div>
                        </Column>
                        <Column class="w-24">
                            <div class="flex justify-center">
                                <RouterLink :to="{
                                    name: 'users.edit',
                                    params: {
                                        _id: user._id
                                    }
                                }">
                                    <Button theme="icon" color="gray-100" class="hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                        <Icon icon="Pencil" width="18" height="18" />
                                    </Button>
                                </RouterLink>
                            </div>
                        </Column>
                    </Row>
                </template>
    
                <template #pagination>
                    <Pagination v-if="pagination"  
                        :pagination="pagination"
                        :disabled="loading"
                    />
                </template>
            </Table>
        </template>
    </Browse>
</template>
<script setup>
import { onMounted, reactive } from 'vue'

const router = useRouter()
const route = useRoute()

const query = reactive({
    search: route.query.search
})

const search = () => {
    router.push({
        name: 'users.index',
        query: {
            search: query.search
        }
    })
}

</script>
