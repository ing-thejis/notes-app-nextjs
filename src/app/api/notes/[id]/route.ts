import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/libs/prisma";

export interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!note) {
      return NextResponse.json(
        {
          status: 404,
          message: "note not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();
    const noteUpdated = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(noteUpdated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // P2025: Record to delete not found
        return NextResponse.json({
          status: 404,
          message: "note not found",
        });
      }
      return NextResponse.json(
        {
          status: 500,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    const noteDeleted = await prisma.note.delete({
      where: {
        id,
      },
    });
    if (!noteDeleted) {
      return NextResponse.json(
        {
          status: 404,
          message: "note not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(noteDeleted);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // P2025: Record to delete not found
        return NextResponse.json({
          status: 404,
          message: "note not found",
        });
      }
      return NextResponse.json(
        {
          status: 500,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
