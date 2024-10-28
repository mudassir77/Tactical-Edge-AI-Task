import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from "@/lib/db/prisma";


export async function POST(request: Request) {
  try {
    const { title, year, img } = await request.json();

    if (!title || !year) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const session = await getServerSession(authOptions)

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

    const newMovie = await prisma.movie.create({
      data: {
        name: title,
        year: parseInt(year, 10),
        img,
        userId: user.id
      },
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create movie.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '8', 10);

  try {
    const session = await getServerSession(authOptions)

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

    const movies = await prisma.movie.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        userId: user.id
      }
    });

    const totalMovies = await prisma.movie.count({
      where: {
        userId: user.id
      }
    });
    const totalPages = Math.ceil(totalMovies / limit);

    return NextResponse.json({ movies, totalPages, currentPage: page }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies.' }, { status: 500 });
  }
}
