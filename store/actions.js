export default {
    addEvent: ({commit, state}, event) => {
        if(!event) return;
        commit('addEvent', event);
    }
}