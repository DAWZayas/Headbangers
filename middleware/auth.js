export default function ({ store, redirect }) {
    if (store.getters.getCurrentUser === null) {
      return redirect('/login')
    }
  }