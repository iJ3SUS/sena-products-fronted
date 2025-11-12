<template>
    <Page>
        <template #actions>
            <slot name="actions" :errors :form :submit :loading>
                <Button 
                    color="primary"
                    :disabled="loading"
                    @handle="submit"
                >
                    Guardar
                </Button>
            </slot>
        </template>

        <slot name="content" :errors :form :submit :loading :loading_show :loading_page ></slot>

    </Page> 
</template>
<script setup>
import Swal from 'sweetalert2'

import useForm  from '@/composables/form'
import useShow from '@/composables/show'
import useUpdate from '@/composables/update'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    resource_url: String,
    show_url: String,
    browse_route: String,
    schema: Object
})

const { form, fill } = useForm(props.schema)

const { loading, errors, update } = useUpdate({
    url: props.resource_url
})

const {
    loading: loading_show,
    show
} = useShow({
    url: props.resource_url
})

const loading_page = ref(true)

const submit = async () => {
    
    const { status, data } = await update(route.params._id, form)

    if(status != 200){
        return
    }

    Swal.fire({
        title: 'Exito!',
        text: 'Se ha actualizado el registro correctamente.',
        icon: 'success',
        confirmButtonText: 'Ok',
        backdrop: 'rgba(0,0,0,0.7)'
    })

    router.back()
    
}



const load = async () => {
    loading_page.value = true

    const { status, data } = await show(route.params._id)

    if (status != 200) {
        Swal.fire({
            title: 'Error!',
            text: 'No se pudo cargar el usuario',
            icon: 'error',
            confirmButtonText: 'Ok',
            backdrop: 'rgba(0,0,0,0.7)'
        }).then(() => {
            router.push({ name: 'users.index' })
        })
        return 
    }

    fill(data)
    loading_page.value = false
}

onMounted(async () => {
    await load()
})

watch(() => route.fullPath, async () => {
    await load()
})
</script>