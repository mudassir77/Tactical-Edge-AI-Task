import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db/prisma';


export async function POST(request: Request) {
  const { firstName, lastName, email, password } = await request.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }, { status: 201 });
  } catch (error) {
    console.error('Error signing up user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
