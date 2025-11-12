<template>

    <div>
        <Card>
            <template #header>
                <div class="flex items-center justify-between">
                    <div>
                        Imágenes
                    </div>
                    <div class="flex items-center">
                        <Button 
                            theme="circle"
                            color="gray"
                            @handle="modal.images = true"
                        >
                            <Icon icon="CloudUpload" width="20" height="20" />
                        </Button>
                    </div>
                </div>
            </template>

            <template #content>
                <div v-if="images.length == 0" class="flex items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center">
                    <div class="space-y-3">
                        <div class="flex justify-center">
                            <Icon icon="LibraryPhoto" width="32" height="32" class="text-gray-400" />
                        </div>
                        <p class="text-sm font-medium text-gray-700">No hay imágenes cargadas</p>
                        <p class="text-xs text-gray-500">Usa el botón de arriba para agregar imágenes.</p>
                    </div>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                        v-for="(item, i) in images" 
                        :key="item?.stamp || i" 
                        class="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md"
                        :class="item?.default === true ? 'ring-2 ring-blue-500 shadow' : ''"
                    >
                        <div class="relative h-48 bg-gray-100" @click="setDefault(i)">
                            <img 
                                :src="`${item.path}`" 
                                :alt="item?.filename || 'Vista previa'" 
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                <div @click.stop>
                                    <Button
                                        v-if="!item.default"
                                        theme="circle"
                                        color="danger"
                                        class="opacity-90 hover:opacity-100 shadow-sm"
                                        @handle="remove(i)"
                                    >
                                        <Icon class="text-white" icon="Trash" width="18" height="18" />
                                    </Button>
                                </div>

                                <span 
                                    v-if="item.default"
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 shadow-sm"
                                >
                                    <Icon class="text-blue-700" icon="Star" width="14" height="14" />
                                    Predeterminada
                                </span>
                            </div>

                            <div class="absolute inset-x-0 bottom-0 p-3">
                                <div class="rounded-md px-3 py-2 bg-black/50 backdrop-blur-sm shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <p class="text-xs font-medium text-white truncate" :title="item?.filename">{{ item?.filename ?? '—' }}</p>
                                        <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-white/90 text-gray-700 font-medium">
                                            {{ item?.mimetype ?? '—' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <Transition name="fade" mode="out-in">
            <AddImage v-if="modal.images" 
                :route="`/dashboard/products/${route.params._id}/images`"
                @close="modal.images = false" 
                @success="success"
            />
        </Transition>
    </div>

</template>
<script setup>
import Swal from 'sweetalert2'

import { useRouter, useRoute } from 'vue-router'
import AddImage from './AddImage.vue'


const props = defineProps({
    form: {
        type: Object,
        default: () => ({})
    },
    modelValue: {
        type: Array,
        default: () => []
    }
})

const router = useRouter()
const route = useRoute()

const modal = reactive({
    images: false
})

const images = computed(() => {

    return props.modelValue.map(item => {
        return {
            ...item,
            path: import.meta.env.VITE_IMG_URL + '/' + item.path
        }
    })

})

const update = () => {

    const r = router.currentRoute.value

    router.replace({ name: r.name, params: r.params, query: { ...r.query, _r: Date.now() } })

}

const success = (data) => {

    modal.images = false
    
    update()
  
}

const emit = defineEmits(['update:modelValue'])

const setDefault = async (index) => {

    const { success, data } = await request(
        () => http.post(`/dashboard/products/${route.params._id}/images/${images.value[index].stamp}/default`)
    )

    update()
}

const remove = async (index) => {

    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir este cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (!result.isConfirmed) {
        return 
    }

    const image = images.value[index]

    const { success, data } = await request(
        () => http.delete(`/dashboard/products/${route.params._id}/images/${image.stamp}`)
    )

    update()
}
</script>