import { ref, computed, reactive, watch } from 'vue'

const chunk = (array, size ) => {

    let result = array.reduce((resultArray, item, index) => {

        let chunkIndex = Math.floor(index/size)

        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray

    }, [])

    return result

}

export default function usePagination() {

    const backup = ref([])

    const items = ref([])

    const pagination = reactive({
        size: 15,
        current: 1,
        last: 1
    })

    const current_items = computed(() => {

        const data = chunk(items.value, pagination.size)

        pagination.last = data.length

        return data

    })

    const pages = computed(() => {

        let tabs = []

        for (let index = 0; index < current_items.value.length; index++) {
          tabs.push(index + 1)
        }
        const maxVisible = 3
      
        let start = Math.max(0, pagination.current - Math.ceil(maxVisible / 2))
        let end = start + maxVisible
      
        if (end > tabs.length) {
          end = tabs.length
          start = Math.max(0, end - maxVisible)
        }
      
        return tabs.slice(start, end)

    })

    return {
        backup,
        items,
        current_items,
        pagination,
        pages

    }

}