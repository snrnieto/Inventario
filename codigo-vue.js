const Productos = { template: 'productos.html' };

const routes = {
  '/': Productos,
  '/productos': Productos
};

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    items: [
      { title: 'Productos', icon: 'mdi-store' },
      { title: 'Proveedores', icon: 'mdi-account-group' },
      { title: 'Clientes', icon: 'mdi-account-search' },
    ],
    drawer: false,
    dialog: false,
    dialogo: false,
    item: 1,
    headers: [
      {
        text: 'Producto',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Precio', value: 'precio' },
      //{ text: 'Imagen', value: 'imagen' , sortable: false},
      { text: 'Acciones', value: 'action', sortable: false },

    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      cantidad: 0,
      precio: 0,
    },
    defaultItem: {
      name: '',
      cantidad: 0,
      precio: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'Pantalon Jean',
          cantidad: 159,
          precio: 6000,
          imagen: 'https://cdn.pixabay.com/photo/2016/03/27/19/44/fashion-1283944_960_720.jpg',
        },
        {
          name: 'Camisa Manga Larga',
          cantidad: 237,
          precio: 9000,
        },
        {
          name: 'Camisa Manga Corta',
          cantidad: 262,
          precio: 16000,
        },
        {
          name: 'Medias para niños',
          cantidad: 305,
          precio: 3700,
        },
        {
          name: 'Bermudas',
          cantidad: 356,
          precio: 16000,
        },
        {
          name: 'Gorras',
          cantidad: 375,
          precio: 1000,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Estas seguro de eliminar el registro?') && this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
})
