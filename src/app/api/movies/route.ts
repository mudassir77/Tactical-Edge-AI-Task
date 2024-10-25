import { NextResponse } from 'next/server';

import prisma from "@/lib/db/prisma";

import { revalidatePath, revalidateTag } from 'next/cache';


export async function POST(request: Request) {
  try {
    const { title, year, img } = await request.json();

    if (!title || !year) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const newMovie = await prisma.movie.create({
      data: {
        name: title,
        year: parseInt(year, 10),
        img,
      },
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json({ error: 'Failed to create movie.' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies.' }, { status: 500 });
  }
}
