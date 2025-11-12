<template>
    <Modal
        title="Agregar imagen"
        @close="emit('close')"
    >

        <File 
            v-model="file"
            :error="errors['image.type']"
        />

        <template #footer>
            <div class="flex justify-end">
                <Button
                    color="primary"
                    @click="upload"
                    :disabled="!file || loading"
                >
                    Aceptar
                </Button>
            </div>
        </template>

    </Modal>
</template>
<script setup>


const emit = defineEmits(['close'])

const props = defineProps({
    route: {
        type: String,
        default: ''
    }
})

const file = ref(null)
const loading = ref(false)
const errors = ref({})

const upload = async () => {

    if (loading.value) return

    errors.value = {}
    loading.value = true

    const formData = new FormData()
    
    formData.append('image', file.value)

    const { success, data } = await request(
        () => http.post(props.route, formData)
    )

    if (!success) {

        data.errors.forEach(error => {
            errors.value[
                error.context.label
            ] = error.message
        
        })

        loading.value = false

        return
    }

    emit('success', data)
    
    loading.value = false

}

</script>