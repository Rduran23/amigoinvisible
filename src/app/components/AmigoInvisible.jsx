"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

function AmigoInvisible() {
  // name, email, amigoInvisible (true/false)
  const [participantes, setParticipantes] = useState([]);

  const [resultado, setResultado] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [mailSended, setMailSended] = useState(false);

  const calcularAmigoInvisible = async () => {
    setShowModal(false);
    setActualIndex(0);
    const indices = participantes.map((_, index) => index);
    let shuffled = [...indices];

    do {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    } while (shuffled.some((index, i) => index === i));

    const nuevosParticipantes = participantes.map((participante, index) => ({
      ...participante,
      amigoInvisible: participantes[shuffled[index]],
    }));

    setParticipantes(nuevosParticipantes);
    setResultado(nuevosParticipantes);
    console.log(resultado)
  };

  const revelarAmigo = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    // setActualIndex((prevIndex) => prevIndex + 1);
  };

  const mandarResultadoPorEmail = async () => {
    const allUsersHaveEmail = resultado.every(
      (participante) => participante.email
    );

    if (allUsersHaveEmail) {
      for (let i = 0; i < resultado.length; i++) {
        const participante = resultado[i];
        const amigoInvisible = participante.amigoInvisible;
        const response = await fetch("/api/mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: participante.name,
            email: participante.email,
            // message -> html sended to email
            message: `
                        <h1>Amigo Invisible</h1>
                        <p>Hola ${participante.name}, tu amigo invisible es: <strong>${amigoInvisible.name}</strong></p>

                        `,
          }),
        });
        const data = await response.json();
        if (data.message === "EMAIL_SEND") {
          setMailSended(true);
        }
      }
    }
  };

  useEffect(() => {
    console.log(resultado)
  }, [resultado])



  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl  mx-auto px-4 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-blue-800">
              Organizador de Amigo Invisible
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Organiza tu intercambio de regalos de forma fácil y divertida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get("name");
                const email = formData.get("email");
                setParticipantes([
                  ...participantes,
                  { name, email, amigoInvisible: null },
                ]);
                e.target.reset();
              }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre (obligatorio)"
                  required
                />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
              </div>
              <Button type="submit" className="w-full">
                Añadir Participante
              </Button>
              <p className="text-gray-600 text-xs">
                * El correo electrónico es opcional, pero necesario para enviar
                los resultados por email
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-800">
              Participantes
            </CardTitle>
            <CardDescription>
              Lista de todos los participantes en el amigo invisible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participantes.map((participante, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="capitalize">{participante.name}</span>
                    </TableCell>
                    <TableCell>{participante.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {participantes.length > 0 && (
              <button
                onClick={() => {
                  setParticipantes([]);
                  setResultado([]);
                  setActualIndex(0);
                  setMailSended(false);
                }}
                className="mt-4 text-red-800 text-xs font-bold"
              >
                Borrar todos los participantes
              </button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-800">
              Sortear Amigo Invisible
            </CardTitle>
            <CardDescription>
              Asigna amigos invisibles aleatoriamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                {
                    resultado && resultado.length > 0 && resultado.map((persona, index) => (
                        <button 
                        key={index}
                        onClick={() => {
                            setActualIndex(index)
                            revelarAmigo()
                        }}
                        className="relative w-[150px] h-[150px] hover:cursor-pointer hover:scale-105 transition-transform group">
                          <img
                            src="/gift.png"
                            className="w-full h-full object-cover drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]  group-hover:drop-shadow-[0_5px_5px_rgba(155,0,0,0.5)]"
                            alt="gift"
        
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="absolute w-[57%] h-[47%] left-[22%] top-[43%]  flex flex-col items-center justify-center text-center bg-transparent">
                              <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap max-w-full text-sm capitalize">
                                {persona?.name}
                              </p>
                            </div>
                          </div>
                        </button>
                    ))
                }
                </div>
                
              {/* {resultado.length > 0 && actualIndex < participantes.length && (
                // <Button onClick={revelarAmigo} className="w-full bg-indigo-700">
                //     Revelar amigo de {participantes[actualIndex]?.name}

                // </Button>
                // <div
                //   style={{
                //     backgroundImage: `url("/gift.png")`,
                //     backgroundSize: "160px 160px",
                //     backgroundRepeat: "no-repeat",
                //     backgroundPosition: 'center',

                //   }}
                //   className="relative w-40 h-40 bg-blue-400"
                // >
                //   <p className="absolute top-[5.5rem] left-4 text-sm bg-red-400 w-[4.5rem]">
                //     Rafa
                //   </p>
                // </div>
                
               
              )} */}

              {resultado.length > 0 && (
                <Button
                  disabled={mailSended}
                  onClick={mandarResultadoPorEmail}
                  className="w-full"
                >
                  {mailSended
                    ? "Emails enviados"
                    : "Enviar resultados por email"}
                </Button>
              )}
            </div>

            <Button
              disabled={participantes.length < 2}
              onClick={calcularAmigoInvisible}
              className="w-full"
            >
              {resultado.length < 1
                ? "Sortear amigo invisible"
                : "Volver a sortear"}
            </Button>
          </CardContent>
        </Card>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{participantes[actualIndex]?.name}</DialogTitle>
              <DialogDescription>
                Tu amigo invisible es:{" "}
                <strong>
                  {participantes[actualIndex]?.amigoInvisible?.name}
                </strong>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={cerrarModal}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {resultado.length > 0 && (
          <ul className="space-y-4 hidden">
            {resultado.map((participante, index) => (
              <li key={index} className="flex flex-row gap-2 items-center">
                <span className="capitalize">{participante.name}</span> tiene de
                amigo invisible a{" "}
                <strong>{participante.amigoInvisible.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AmigoInvisible;
