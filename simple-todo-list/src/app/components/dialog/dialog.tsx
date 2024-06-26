import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  getTasks: () => void;
};

const TodoDialog = ({ getTasks }: Props) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const saveTask = () => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    existingTasks.push({
      id: getRandomInt(9999, 999999),
      name: taskName,
      description: taskDescription,
    });

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    setTaskName("");
    setTaskDescription("");

    getTasks();
  };

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Adicione uma tarefa para a sua lista de tarefas.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="task">Tarefa</Label>
            <Input
              type="text"
              id="task"
              placeholder="Tarefa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Label htmlFor="description">Descrição</Label>
            <Input
              type="text"
              id="description"
              placeholder="Descrição"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose className="flex gap-4">
            <Button type="button" variant="secondary">
              Fechar
            </Button>
            <Button type="button" onClick={saveTask}>
              Enviar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
