import Swal from 'sweetalert2'

export const Alert = async (title,icon, page) => {
  await Swal.fire({
    icon: icon,
    title: title,
    backdrop: true,
    showConfirmButton: true
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = `/${page}`
    }
  })
}


export const confirmDelete = async () => {
  await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
}