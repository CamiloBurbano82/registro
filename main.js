var app = new Vue({
    el: '#app',
    data: {
        titulo: 'Registro',
        nombre: '',
        apellido: '',
        usuario: '',
        fechaNacimiento: '',
        registros: [{
            nombres: '',
            apellidos: '',
            nombreCompleto:'',
            edad:'',
            claveAleatoria:'',
            usuarioV: '',
        }]
    },
    methods: {

        guardar() {

            const filtro = this.registros.filter(item => item.usuario == this.usuario);

            if (filtro == null) {
                alert('El usuario ' + this.usuario + ' existe');
            } else {
                this.registros.push({ nombres: this.nombre, apellidos: this.apellido, nombreCompleto: this.nombre +' '+this.apellido })

            }
            console.log(this.registros);
        },

        calcularEdad(fecha) {

            let hoy = new Date();
            let fechaNacimiento = new Date(fecha);
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
            if (
                diferenciaMeses < 0 ||
                (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
            ) {
                edad--
            }
            return edad;

        },

        generarClave(no, ap){
            let n = no[0];
            let p = ap[1];
            let cont;

            for(let i; i<3; i++){
                cont = Math.random()*(9 - 1) + 1;
            }

            return n+p+cont;


        }

    }
})