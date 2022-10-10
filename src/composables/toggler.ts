import { ref } from 'vue';

const useToggler = (initialState = true) => {
  const isToggledOn = ref<boolean>(initialState);

  const toggle = () => {
    isToggledOn.value = !isToggledOn.value;
  };

  return { isToggledOn, toggle };
};

export default useToggler;
