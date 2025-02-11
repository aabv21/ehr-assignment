import { ReactNode, useState, useEffect } from "react";
import {
  Building2,
  Calendar,
  IdCard,
  Mail,
  Phone,
  User,
  VenusAndMars,
} from "lucide-react";

import { useSelector } from "react-redux";
//Components
import PageView from "@/components/PageView.tsx";
import { useDialog } from "@/hooks/useDialog";
import { DataTable } from "@/components/DataTable.tsx";
import PatientForm from "@/components/PatientForm";
import Loading from "@/components/Loading";

//Services
import { getPatients, deletePatient } from "@/services/patient.service";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};
const ContributionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { currentUser } = useAuth() as AuthContextType;
  const { openDialog } = useDialog();
  const { openConfirmDialog } = useConfirmDialog();

  const patientEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision["patientEvent"] ?? 0
  );

  useEffect(() => {
    (async () => {
      try {
        const patients = await getPatients();
        const newPatients = patients.map((patient: any) => ({
          ...patient,
          name: patient.name ?? patient.p_name,
          email: patient.email ?? patient.p_email,
          phone: patient.phone ?? patient.p_phone,
          gender: patient.gender ?? patient.p_gender,
          ehrSystem: patient.ehrSystem ?? patient.p_ehrSystem,
          createdAt: patient.createdAt ?? patient.p_createdAt,
          id: patient.id ?? patient.p_id,
        }));
        setData(newPatients);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [patientEvent]);

  const pageActions = [
    {
      label: "Add Patient",
      onClick: () => {
        openDialog({
          title: "Add Patient",
          children: <PatientForm patientId={undefined} />,
        });
      },
    },
  ];

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  const headers = [
    {
      label: "ID",
      value: "id",
      type: "text",
      icon: <IdCard height={18} width={18} />,
    },
    {
      label: "Email",
      value: "email",
      type: "text",
      icon: <Mail height={18} width={18} />,
    },
    {
      label: "EHR System",
      value: "ehrSystem",
      type: "text",
      icon: <Building2 height={18} width={18} />,
    },
    {
      label: "Name",
      value: "name",
      type: "text",
      icon: <User height={18} width={18} />,
    },
    {
      label: "Phone",
      value: "phone",
      type: "text",
      icon: <Phone height={18} width={18} />,
    },
    {
      label: "Gender",
      value: "gender",
      type: "text",
      icon: <VenusAndMars height={18} width={18} />,
    },
    {
      label: "Created At",
      value: "createdAt",
      type: "text",
      icon: <Calendar height={18} width={18} />,
    },
  ];

  const dataTableActions = [
    {
      type: "delete",
      label: "Delete",
      onClick: (data: any) => {
        openConfirmDialog({
          description:
            "Are you sure you want to remove this patient? You won't be able to initiate any further transactions with this patient.",
          onContinue: () => deletePatient(data.id),
          successMessage: "Patient deleted",
          triggerEvent: "patientEvent",
        });
      },
    },
    {
      type: "edit",
      label: "View / Edit",
      onClick: (data: any) => {
        openDialog({
          title: "View / Edit Patient",
          children: <PatientForm patientId={data.id} />,
        });
      },
    },
  ];

  return (
    <PageView actions={pageActions} title="Patients">
      <DataTable
        headers={headers}
        data={data}
        loading={loading}
        actions={dataTableActions}
      />
    </PageView>
  );
};

export default ContributionPage;
