import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components
import InputField from "@/components/fields/InputField";
import SelectField from "@/components/fields/SelectField";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// interfaces
import { patientFormSchema } from "@/interfaces/patient";

// dto
import { CreatePatientDto } from "@/components/dtos/create-patient.dto";
import { UpdatePatientDto } from "@/components/dtos/update-patient.dto";

//services
import {
  createPatient,
  editPatient,
  getPatient,
} from "@/services/patient.service.ts";
import { refresDataRevision } from "@/store/tools/revisionSlice";
import { useDialog } from "@/hooks/useDialog";

const PatientForm = ({
  patientId,
}: {
  patientId: string | undefined;
}): React.JSX.Element => {
  const dispatch = useDispatch();
  const { closeDialog } = useDialog() as { closeDialog: () => void };

  const [loading, setLoading] = useState(false);
  const [ehrSystem, setEhrSystem] = useState("Athena");
  const [patientsByEhrSystem, setPatientsByEhrSystem] = useState<
    z.infer<typeof patientFormSchema>[]
  >([]);

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      ehrSystem: "Athena",
      name: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
      email: "",
      emergencyContact: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      primaryCarePhysician: "",
      allergies: "",
      currentMedications: "",
      medicalHistory: "",
      socialHistory: "",
      familyHistory: "",
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) return;

      setLoading(true);
      try {
        const patient = await getPatient(patientId);
        if (patient) {
          // Set the EHR system first
          setEhrSystem(patient.ehrSystem || "Athena");
          // Then reset the form with patient data
          form.reset({
            ...patient,
            name: patient.name ?? patient.p_name,
            email: patient.email ?? patient.p_email,
            phone: patient.phone ?? patient.p_phone,
            gender: patient.gender ?? patient.p_gender,
            ehrSystem: patient.ehrSystem ?? patient.p_ehrSystem,
            dob: patient.dob ?? patient.p_dob,
            address: patient.address ?? patient.p_address,
            emergencyContact:
              patient.emergencyContact ?? patient.p_emergencyContact,
            insuranceProvider:
              patient.insuranceProvider ?? patient.p_insuranceProvider,
            insurancePolicyNumber:
              patient.insurancePolicyNumber ?? patient.p_insurancePolicyNumber,
            primaryCarePhysician:
              patient.primaryCarePhysician ?? patient.p_primaryCarePhysician,
            allergies: patient.allergies ?? patient.p_allergies,
            currentMedications:
              patient.currentMedications ?? patient.p_currentMedications,
            medicalHistory: patient.medicalHistory ?? patient.p_medicalHistory,
            socialHistory: patient.socialHistory ?? patient.p_socialHistory,
            familyHistory: patient.familyHistory ?? patient.p_familyHistory,
          });
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        toast({
          title: "Error",
          description: "Failed to fetch patient data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, form]);

  const onSubmitAddEhrPatientData = async (
    values: z.infer<typeof patientFormSchema>
  ) => {
    setLoading(true);
    try {
      const mappedData = {
        patient:
          values.ehrSystem === "Athena"
            ? {
                name: values.name,
                gender: values.gender,
                dob: values.dob,
                address: values.address,
                phone: values.phone,
                email: values.email,
                emergencyContact: values.emergencyContact,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                primaryCarePhysician: values.primaryCarePhysician,
                allergies: values.allergies,
                currentMedications: values.currentMedications,
                medicalHistory: values.medicalHistory,
                socialHistory: values.socialHistory,
                familyHistory: values.familyHistory,
                ehrSystem: values.ehrSystem,
              }
            : {
                p_name: values.name,
                p_gender: values.gender,
                p_dob: values.dob,
                p_address: values.address,
                p_phone: values.phone,
                p_email: values.email,
                p_emergencyContact: values.emergencyContact,
                p_insuranceProvider: values.insuranceProvider,
                p_insurancePolicyNumber: values.insurancePolicyNumber,
                p_primaryCarePhysician: values.primaryCarePhysician,
                p_allergies: values.allergies,
                p_currentMedications: values.currentMedications,
                p_medicalHistory: values.medicalHistory,
                p_socialHistory: values.socialHistory,
                p_familyHistory: values.familyHistory,
                p_ehrSystem: values.ehrSystem,
              },
      };

      const copyPatientsByEhrSystem = [...patientsByEhrSystem];
      copyPatientsByEhrSystem.push(mappedData);
      setPatientsByEhrSystem(copyPatientsByEhrSystem);

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add EHR patient data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit = async () => {
    if (!patientId) return;

    setLoading(true);
    try {
      await editPatient(
        patientId,
        patientsByEhrSystem as unknown as UpdatePatientDto
      );

      toast({
        title: "Patient updated",
        description: "Patient updated successfully",
        variant: "default",
      });

      dispatch(refresDataRevision({ event: "patientEvent" }));
      closeDialog();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to edit patient data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onAddSubmit = async () => {
    setLoading(true);
    try {
      await createPatient(
        patientsByEhrSystem as unknown as [{ patient: CreatePatientDto }]
      );

      toast({
        title: "Patient(s) added",
        description: "Patient(s) added successfully",
        variant: "default",
      });

      dispatch(refresDataRevision({ event: "patientEvent" }));
      closeDialog();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save patient data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFieldPrefix = () => (ehrSystem === "Athena" ? "" : "p_");
  const getPlaceholder = (baseText: string) =>
    ehrSystem === "Athena" ? baseText : `Patient ${baseText}`;

  return (
    <>
      {!patientId && (
        <div className="w-full">
          {patientsByEhrSystem.length > 0 && (
            <ul className="list-disc">
              {patientsByEhrSystem.map((patient) => (
                <li key={patient?.patient?.email ?? patient?.patient?.p_email}>
                  {`${patient?.patient?.name ?? patient?.patient?.p_name} - ${
                    patient?.patient?.ehrSystem ?? patient?.patient?.p_ehrSystem
                  }`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex flex-row justify-center p-6 h-screen">
        <Form {...form}>
          <form
            onSubmit={
              patientId
                ? form.handleSubmit(onEditSubmit)
                : form.handleSubmit(onSubmitAddEhrPatientData)
            }
            className="space-y-4"
          >
            <FormLabel>EHR System</FormLabel>
            <SelectField
              name="ehrSystem"
              placeholder="Select EHR System"
              formControl={form.control}
              options={["Athena", "Allscripts"]}
              onChange={(value: string) => setEhrSystem(value)}
            />
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name={`${getFieldPrefix()}name`}
                placeholder={getPlaceholder("Name")}
                formControl={form.control}
              />
              <SelectField
                name={`${getFieldPrefix()}gender`}
                placeholder={getPlaceholder("Gender")}
                formControl={form.control}
                options={["Male", "Female", "Other"]}
              />
              <InputField
                name={`${getFieldPrefix()}dob`}
                placeholder={getPlaceholder("Date of Birth")}
                inputType="date"
                description="Date of Birth"
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}phone`}
                placeholder={getPlaceholder("Phone Number")}
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}email`}
                placeholder={getPlaceholder("Email")}
                inputType="email"
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}emergencyContact`}
                placeholder={getPlaceholder("Emergency Contact")}
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}insuranceProvider`}
                placeholder={getPlaceholder("Insurance Provider")}
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}insurancePolicyNumber`}
                placeholder={getPlaceholder("Insurance Policy Number")}
                formControl={form.control}
              />
              <InputField
                name={`${getFieldPrefix()}primaryCarePhysician`}
                placeholder={getPlaceholder("Primary Care Physician")}
                formControl={form.control}
              />
            </div>

            <InputField
              name={`${getFieldPrefix()}address`}
              placeholder={getPlaceholder("Address")}
              formControl={form.control}
            />
            <InputField
              name={`${getFieldPrefix()}allergies`}
              placeholder={getPlaceholder("Allergies")}
              formControl={form.control}
            />
            <InputField
              name={`${getFieldPrefix()}currentMedications`}
              placeholder={getPlaceholder("Current Medications")}
              formControl={form.control}
            />
            <InputField
              name={`${getFieldPrefix()}medicalHistory`}
              placeholder={getPlaceholder("Medical History")}
              formControl={form.control}
            />
            <InputField
              name={`${getFieldPrefix()}socialHistory`}
              placeholder={getPlaceholder("Social History")}
              formControl={form.control}
            />
            <InputField
              name={`${getFieldPrefix()}familyHistory`}
              placeholder={getPlaceholder("Family History")}
              formControl={form.control}
            />

            {!patientId ? (
              <>
                <Button type="submit" className="w-full" disabled={loading}>
                  {"Add EHR patient data"}
                </Button>
                <Button
                  className="w-full"
                  disabled={loading || patientsByEhrSystem.length === 0}
                  onClick={onAddSubmit}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </>
            ) : (
              <Button type="submit" className="w-full">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default PatientForm;
