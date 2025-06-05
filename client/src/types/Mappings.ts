export interface Mapping {
  id: number;
  patientId: number;
  doctorId: number;
  patientName?: string; // optional for display
  doctorName?: string;
}
