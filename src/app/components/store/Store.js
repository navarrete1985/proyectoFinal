import Vuex from 'vuex';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'; //Mapa para hacer más facil la definición de nuestras prop computadas compartidas

function config(Vue) {
    
    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            gLoader: true,
            baseUrl: window.location.origin
        },
        getters: {
            gLoader: state => state.gLoader,
            baseUrl: state => state.baseUrl
        },
        mutations: {
            setGLoader(state, newState) {
                state.gLoader = newState;
            }
        },
        actions: {

        }
    })

    return {
        store,
        computed: {
            ...mapState([
                'gLoader',
                'baseUrl'
            ]),
            ...mapGetters(['gLoader', 'baseUrl'])
        },
        methods:{
            ...mapMutations(['setGLoader']),
            ...mapActions([])
        },
    }

}

export {config};