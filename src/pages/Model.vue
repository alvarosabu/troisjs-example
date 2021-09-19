
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Renderer, Scene, Camera, PointLight, AmbientLight, GltfModel } from 'troisjs'
export default defineComponent({
    components: {
        Renderer, Scene, Camera, PointLight, AmbientLight, GltfModel
    },
    setup() {
        const renderer = ref(null);
        const model = ref(null);

        function onReady(model) {
            console.log('Ready', model)
            model.traverse(o => {
                if (o.isMesh) {
                // handle both multiple and single materials
                    const asArray = Array.isArray(o.material) ? o.material : [o.material]
                    // 0 works for matte materials - change as needed
                    asArray.forEach(mat => (mat.metalness = 0))
                }
            })
        }

         onMounted(() => {
            renderer?.value?.onBeforeRender(() => {
                model.value.rotation.x += 0.01;
            });
        })

        return {
            renderer,
            model,
            onReady
        }
    }
})
</script>

<template>
    <div class="container">
        <Renderer ref="renderer" antialias orbit-ctrl resize="window">
            <Camera :position="{x: -10, z: 20}" />
            <Scene background="#fff">
                <AmbientLight />
                <PointLight
                color="white"
                :position="{ x: 100, y: 1000, z: 40 }"
                :intensity="1"
                />
                <GltfModel
                    ref="model"
                    src="/models/crash-bandicoot/crash-bandicoot.gltf"
                    @load="onReady"
                />
            </Scene>
        </Renderer>
    </div>
</template>
