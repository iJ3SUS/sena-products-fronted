<template>

    <div class="bg-white border border-slate-200 shadow rounded-md">

        <slot name="top">
            <div class="p-4"></div>
        </slot>

        <table class="w-full text-sm text-slate-800">
    
            <thead class="text-xs text-slate-500 uppercase font-semibold border-b border-t border-slate-200 bg-slate-100">
                <slot name="head"></slot>                
            </thead>
    
            <tbody class="text-sm">
                <slot name="body"></slot>
            </tbody>
    
        </table>

        <div class="h-4 border-b bg-slate-100 border-slate-200"></div>

        <div class="p-4">
            <slot name="pagination"></slot>
        </div>

    </div>

</template>
<script setup>


</script>
