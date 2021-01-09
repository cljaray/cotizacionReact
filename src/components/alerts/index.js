import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    showConfirmButton: true,
    timer: 3000,
    
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
export const Warning = Swal.mixin({
  
    icon: 'error',
    timerProgressBar: true,
    showConfirmButton: true,
    timer: 3000
    

})