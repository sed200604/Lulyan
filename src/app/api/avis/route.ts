import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would save this to a database
    // For now, we simulate a successful review submission
    
    const { rating, name, text, size } = body;
    
    if (!rating || !name || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: rating, name, or text' },
        { status: 400 }
      );
    }
    
    // Simulation of delay for real-world feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: 'Votre avis a été soumis avec succès et est en attente de modération.',
      review: {
        id: Date.now().toString(),
        name,
        rating,
        text,
        size,
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        verified: false // New reviews need to be verified
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing review submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
