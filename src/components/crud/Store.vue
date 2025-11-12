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
        
        <slot name="content" :errors :form :submit :loading></slot>

    </Page>
</template>
<script setup>
import Swal from 'sweetalert2'

import Page from '@/components/page/Page.vue'

import useForm from '@/composables/form'
import useStore from '@/composables/store'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    schema: Object,
    browse_route: String,
    resource_url: String,
})

const { form } = useForm(props.schema)

const {
    loading,
    errors,
    store
} = useStore({
    url: props.resource_url
})

const submit = async () => {
    
    const { status, data } = await store(form)

    if(status != 200){
        return
    }

    Swal.fire({
        title: 'Exito!',
        text: 'Se ha creado el registro correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
        backdrop: false,
        backdrop: 'rgba(0,0,0,0.7)'
    }).then(() => {
        router.back()
    })
}

</script>