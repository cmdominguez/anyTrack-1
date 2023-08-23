"use client";
import React, { useEffect, useState } from "react";
import { useDriversStore } from "@/store/driversStore";
import { useContextDrivers } from "../context/ContextDrivers";
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
import { Driver } from "../interface/interfaceDrivers";
import useAnimationStore from "@/store/formAnimation";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "EMAIL", uid: "email" },
  { name: "DNI", uid: "dni" },
  { name: "ACCIÓN", uid: "accion" },
];

export default function TableDriver() {
  const { drivers, deleteDriver } = useDriversStore();
  const { idDriver } = useContextDrivers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idDriverToDelete, setIdDriverToDelete] = useState<string | null>(null);
  const [nameDriverToDelete, setNameDriverToDelete] = useState("");
  const { toggleAnimationForm } = useAnimationStore();

  useEffect(() => {
    if (confirmDelete) {
      deleteDriver(idDriverToDelete!);
    }

    if (!isOpen) {
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  const handleDeleteDriver = () => {
    setConfirmDelete(true);
    onClose();
  };

  const onOpenModal = (id: string, name: string) => {
    setIdDriverToDelete(id);
    setNameDriverToDelete(name);
    onOpen();
  };

  const handleEditDriver = (id: string) => {
    //paso el id al context
    idDriver(id);
  };

  const renderCell = React.useCallback((item: Driver, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Driver];

    switch (columnKey) {
      case "nombre":
        return item.name;

      case "email":
        return item.email;

      case "dni":
        return item.dni;

      case "accion":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar vehículo">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon
                  onClick={() => {
                    handleEditDriver(item.id!), toggleAnimationForm();
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar vehículo">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => onOpenModal(item.id!, item.name)} />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

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
            <TableBody items={drivers}>
              {(item) => (
                <TableRow>
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
                ¿Estás seguro de eliminar este chofer?
              </ModalHeader>
              <ModalBody>
                <p>{nameDriverToDelete}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleDeleteDriver}>
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
