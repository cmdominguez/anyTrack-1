"use client";
import React, { useEffect, useState } from "react";
import { useClientsStore } from "@/store/clientsStore";
import { useContextClients } from "../context/ContextClients";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "./ui/EditIcon";
import { DeleteIcon } from "./ui/DeleteIcon";
import { Client } from "../interface/interfaceClients";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "TELÉFONO", uid: "telefono" },
  { name: "DIRECCIÓN", uid: "direccion" },
  { name: "DNI", uid: "dni" },
  { name: "ACCIÓN", uid: "accion" },
];

export default function TableClients() {
  const { clients, deleteClient } = useClientsStore();
  const { idClient } = useContextClients();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idClientToDelete, setIdClientToDelete] = useState<string | null>(null);
  const [nameClientToDelete, setNameClientToDelete] = useState("");

  useEffect(() => {
    if (confirmDelete) {
      deleteClient(idClientToDelete!);
    }

    if (!isOpen) {
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  const handleDeleteClient = () => {
    setConfirmDelete(true);
    onClose();
  };

  const onOpenModal = (id: string, name: string) => {
    setIdClientToDelete(id);
    setNameClientToDelete(name);
    onOpen();
  };

  const handleEditClient = (id: string) => {
    //paso el id al context
    idClient(id);
  };

  const renderCell = React.useCallback((item: Client, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Client];

    switch (columnKey) {
      case "nombre":
        return item.name;

      case "telefono":
        return item.phone;

      case "direccion":
        return item.address;

      case "dni":
        return item.dni;

      case "accion":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar cliente">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => handleEditClient(item.id!)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar cliente">
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
            className="mt-5"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} className="py-4">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={clients}>
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
                ¿Estás seguro de eliminar este cliente?
              </ModalHeader>
              <ModalBody>
                <p>{nameClientToDelete}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleDeleteClient}>
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
