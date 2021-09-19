<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight, BasicMaterial,
Texture, Sphere } from 'troisjs';
import  { NumberField} from '@asigloo/vue-dynamic-forms';

export default defineComponent({
  name: 'Home',
  components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, AmbientLight, BasicMaterial,
Texture, Sphere },
  setup() {
    const renderer = ref(null);
    const box = ref(null);
    const sphere = ref(null);

    const boxRotation = ref(0.01);

    onMounted(() => {
      renderer?.value?.onBeforeRender(() => {
        box.value.mesh.rotation.x += boxRotation.value;
        sphere.value.mesh.rotation.y += 0.001;
      });
    })

    const spherePosition = reactive({
      spherePosX: -10,
      spherePosY: -10,
      spherePosZ: -10,
    });

     const form = computed(() => ({
      id: 'basic-demo',
      fields: {
        spherePosX: NumberField({
          label: 'Sphere Position X',
          value: -10
        }),
         spherePosY: NumberField({
          label: 'Sphere Position Y',
          value: -10
        }),
         spherePosZ: NumberField({
          label: 'Sphere Position Z',
          value: -10
        }),
        boxRotation: NumberField({
          label: 'Box rotation factor',
          value: 0.01
        }),
      },
    }));

    function valueChanged(values) {
      Object.assign(spherePosition, values);
      boxRotation.value = values.boxRotation;
    }

    return { renderer, box, sphere, form, valueChanged, spherePosition };
  }
});
</script>
<template>
  <div class="space relative">
    <div class="bg-white p-4 px-8 rounded w-1/3 shadow-lg fixed right-2 top-2">
      <DynamicForm
          :form="form"
          @change="valueChanged"
        />
    </div>
    <Renderer resize="window" orbit-ctrl ref="renderer" alpha="0">
      <Camera :position="{ z: 10 }" />
      <Scene>
        <PointLight :position="{ y: 50, z: 50 }" />
         <AmbientLight />
        <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <BasicMaterial>
            <Texture src="/ink.jpg" refraction :refraction-ratio="0.95" />
          </BasicMaterial>
        </Box>
        <Sphere ref="sphere" :position="{ x: spherePosition.spherePosX, y: spherePosition.spherePosY, z: spherePosition.spherePosZ }" :radius="10">
          <BasicMaterial>
            <Texture src="/splash-bg.jpg" refraction :refraction-ratio="0.95" />
          </BasicMaterial>
        </Sphere>
      </Scene>
    </Renderer>
  </div>
</template>

<style>
.space {
  background-image: url('/space-dust.png')
}
</style>
