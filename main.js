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
    mounted() {
        if (localStorage.getItem('registros')) {
            this.registros = JSON.parse(localStorage.getItem('registros'));
        }
    },
    methods: {

        guardar() {

            const val = this.validar();

            if (val) {
                const filtro = this.registros.filter(item => item.usuario == this.usuario);
                if (filtro.length == 0) {
                    let ed = this.calcularEdad(this.fechaNacimiento);

                    if (ed != 'error') {
                        let pw = this.generarClave(this.nombre, this.apellido);

                        this.registros.push({ nombres: this.nombre, apellidos: this.apellido, nombreCompleto: this.nombre + ' ' + this.apellido, edad: ed, claveAleatoria: pw, usuario: this.usuario });

                        // localStorage
                        const parsed = JSON.stringify(this.registros);
                        localStorage.setItem('registros', parsed);

                        alert('Registro Exitoso!!!');
                        this.limpiar();
                    } else {
                        alert('Error en la fecha ingresada');
                    }


                } else {
                    alert('El usuario ' + this.usuario + ' existe');
                }
            } else {
                alert('Todos los campos son obligatorios');
            }




            //console.log(this.registros);
        },

        calcularEdad(fecha) {

            let hoy = new Date();
            let fechaNacimiento = new Date(fecha);
            let bandera = hoy > fechaNacimiento;

            if (bandera == true) {
                let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
                let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
                if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                    edad--
                }
                return edad;
            } else {
                return 'error';
            }

        },

        generarClave(no, ap) {
            let n = no[0] + no[no.length - 1];
            let p = ap[0] + ap[ap.length - 1];
            let cont = '';

            for (let i = 0; i <= 3; i++) {
                cont = cont + Math.floor(Math.random() * 9);
            }

            return n + p + cont;

        },

        validar() {
            if (this.nombre == '' || this.apellido == '' || this.usuario == '' || this.fechaNacimiento == '') {
                return false;
            } else {
                return true;
            }
        },

        limpiar() {
            this.nombre = '';
            this.apellido = '';
            this.usuario = '';
            this.fechaNacimiento = '';
        }

    }
})