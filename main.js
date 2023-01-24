var app = new Vue({
    el: '#app',
    data: {
        titulo: 'Registro',
        nombre: '',
        apellido: '',
        usuario: '',
        fechaNacimiento: '',
        registros: []
    },
    methods: {

        guardar() {

            const filtro = this.registros.filter(item => item.usuarioV == this.usuario);

            if (filtro.length != 0) {
                alert('El usuario ' + this.usuario + ' existe');
            } else {
                let ed = this.calcularEdad(this.fechaNacimiento);
                let pw = this.generarClave(this.nombre, this.apellido);

                this.registros.push({ nombres: this.nombre, apellidos: this.apellido, nombreCompleto: this.nombre +' '+this.apellido, edad: ed, claveAleatoria: pw, usuarioV: this.usuario });

                alert('Registro Exitoso!!!');

            }
            //console.log(this.registros);
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

        generarClave(no, ap) {
            let n = no[0] + no[no.length - 1];
            let p = ap[0] + ap[ap.length - 1];
            let cont = '';

            for (let i = 0; i <= 3; i++) {
                cont = cont + Math.floor(Math.random() * 9);
            }

            return n + p + cont;

        }

    }
})