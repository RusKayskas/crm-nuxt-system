interface IAuthStore {
  email: string,
  name: string,
  status: boolean
}
//состояние по умолчанию
const defaultValue:  { user: IAuthStore } = {
  user: {
    email: '',
    name: '',
    status: false
  },
}

export const useAuthStore = defineStore('auth', {
  state: () => defaultValue,
  //получаем состояние
  getters: {
    isAuth: state => state.user.status
  },
  actions: {
    //чистим наш стейт
    clear() {
      this.$patch(defaultValue);
    },
    //получаем input которыый по типу наш стор и их перезаписываем и обновляем
    set(input: IAuthStore) {
      this.$patch({user: input});
    }
  }
})

export const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    }
  }
})