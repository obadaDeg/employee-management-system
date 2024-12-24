export const attendanceColumns = [
  { key: "name", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "type", label: "Type" },
  { key: "checkinTime", label: "Check-In Time" },
  { key: "status", label: "Status" },
];

export const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "id", label: "ID" },
  { key: "designation", label: "Designation" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

export const loginFields = [
  { id: "email", label: "Email", type: "email", required: true },
  { id: "password", label: "Password", type: "password", required: true },
];

export const employeeFields = [
  { id: "name", label: "Name", required: true },
  { id: "id", label: "ID", required: true },
  { id: "designation", label: "Designation", required: true },
  {
    id: "type",
    label: "Type",
    required: true,
    options: [
      { label: "Permanent", value: "permanent" },
      { label: "Contract", value: "contract" },
    ],
  },
  {
    id: "status",
    label: "Status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];



export const defaultImage =
  "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg";
