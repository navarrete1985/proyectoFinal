var SweetAlert = {
    methods: {
        alert(options) {
            this.$swal(options);
        },
        alertSuccess({title = "Operación realizada con éxito", text = "La operación ha sido realizada satisfactoriamente", timer = 3000, showConfirmationButton = false} = {}) {
            this.alert({
                title: title,
                text: text,
                timer: timer,
                showConfirmButton: showConfirmationButton,
                type: 'success'
            });
        },
        alertError({title = "¡Error!", text = "Oops...La operación no se ha podido realizar"} = {}) {  
            this.alert({
                title: title,
                text: text,
                type: 'error'
            });
        },
        confirm(callback, options = {}) {
            options = Object.assign({
                title: "Advertencia",
                text: "¿Estás seguro de que quieres realizar esta operación?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Conformar",
                closeOnConfirm: false
            }, options);

            this.$swal(options, callback);
        },
        toast(options) {
            options = Object.assign({
                toast: true,
            }, options);

            this.$swal(options);
        },
        toastSuccess({title = 'Operación realizada con éxito', timer = 3000, position = 'top-end', showConfirmButton = false} = {}) {
            this.toast({
                title, 
                type: 'success',
                timer,
                position,
                showConfirmButton
            });
        },
        toastError({title = 'Error al realizar la operación', timer = 3000, position = 'top-end', showConfirmButton = false} = {}) {
            this.toast({
                title, 
                type: 'error',
                timer,
                position,
                showConfirmButton
            })
        }
    }
}

export default SweetAlert;
export {SweetAlert};