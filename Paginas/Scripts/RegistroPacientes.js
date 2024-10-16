jQuery(function () {  
    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServicios("https://localhost:44389/api/Pacientes/LlenarTabla", "#tblPacientes");
}