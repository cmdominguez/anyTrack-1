"use client";
import React, { useEffect, useState } from "react";
import { useVehiclesStore } from "@/store/vehiclesStore";
import { useContextVehicles } from "../context/ContextVehicles";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "./ui/EditIcon";
import { DeleteIcon } from "./ui/DeleteIcon";
import { VehicleInterface } from "../interface/interfaceVehicles";

const columns = [
  { name: "PATENTE", uid: "patente" },
  { name: "TIPO DE VEHÍCULO", uid: "vehiculo" },
  { name: "ACCIÓN", uid: "accion" },
];

export default function TableVehicles() {
  const { vehicles, deleteVehicle } = useVehiclesStore();
  const { idVehicle } = useContextVehicles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idVehicleToDelete, setIdVehicleToDelete] = useState<string | null>(
    null
  );
  const [patentVehicleToDelete, setPatentVehicleToDelete] = useState("");

  useEffect(() => {
    if (confirmDelete) {
      deleteVehicle(idVehicleToDelete!);
    }

    if (!isOpen) {
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  const handleDeleteVehicle = () => {
    setConfirmDelete(true);
    onClose();
  };

  const onOpenModal = (id: string, patent: string) => {
    setIdVehicleToDelete(id);
    setPatentVehicleToDelete(patent);
    onOpen();
  };

  const handleEditVehicle = (id: string) => {
    //paso el id al context
    idVehicle(id);
  };

  const renderCell = React.useCallback(
    (item: VehicleInterface, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof VehicleInterface];

      switch (columnKey) {
        case "patente":
          return item.patent;

        case "vehiculo":
          return item.type.name;

        case "accion":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar vehículo">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => handleEditVehicle(item.id!)} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar vehículo">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon
                    onClick={() => onOpenModal(item.id!, item.patent)}
                  />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <div className="min-h-screen">
        <div>
          <Table
            aria-label="Table with cells"
            selectionMode="single"
            className="mt-5 lg:w-3/5 mx-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} className="py-4">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={vehicles}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell className="py-4">
                      {renderCell(item, columnKey) as React.ReactNode}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Estás seguro de eliminar este vehículo?
              </ModalHeader>
              <ModalBody>
                <p>{patentVehicleToDelete}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleDeleteVehicle}>
                  Eliminar
                </Button>
                <Button color="default" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
