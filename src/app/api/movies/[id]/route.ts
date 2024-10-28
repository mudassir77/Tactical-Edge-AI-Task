import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import prisma from "@/lib/db/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = parseInt(params.id, 10);
    const { title, year, img, userId } = await request.json();

    if (isNaN(movieId) || !userId) {
      return NextResponse.json({ error: 'Invalid movie ID or missing user ID.' }, { status: 400 });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        name: title,
        year: year ? parseInt(year, 10) : undefined,
        img,
      },
    });
    revalidatePath(`/update-movie/${movieId}`);
    revalidatePath('/');
    return NextResponse.json(updatedMovie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update movie.' }, { status: 500 });
  }
}


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = parseInt(params.id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json({ error: 'Invalid movie ID.' }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: 'Movie not found.' }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movie.' }, { status: 500 });
  }
}