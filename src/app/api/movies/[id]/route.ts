import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import prisma from "@/lib/db/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const movieId = parseInt(params.id, 10);
    const { title, year, img } = await request.json();

    if (isNaN(movieId)) {
      return NextResponse.json({ error: 'Invalid movie ID or missing user ID.' }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email
      },
      select: {
        id: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
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