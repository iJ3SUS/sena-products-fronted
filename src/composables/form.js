import { ref, reactive } from "vue"

export default function useForm(item = {}) {
    
    item = JSON.parse( JSON.stringify(item) )

    const form = reactive(
        JSON.parse( JSON.stringify(item) )
    )

    const errors = ref({})

    const fetching = ref(false)

    const reset = () => {

        errors.value = {}

        Object.keys(item).forEach(e => {
            form[e] = JSON.parse( 
                JSON.stringify(item[e]) 
            )
        })
        
    }
    
    const fill = (element) => {

        const base = JSON.parse( JSON.stringify(item) )
        
        errors.value = {}

        element = JSON.parse( JSON.stringify(element) )

        Object.keys(form).forEach(e => {

            if(element[e] === undefined || element[e] === null) {
                
                form[e] = JSON.parse( 
                    JSON.stringify( base[e] )
                )

                return
            }

            form[e] = JSON.parse(
                JSON.stringify(element[e])
            )

        })

    }

    return {
        form,
        fetching,
        errors,
        reset,
        fill
    }
    
}