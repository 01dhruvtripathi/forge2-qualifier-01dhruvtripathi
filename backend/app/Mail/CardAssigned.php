<?php

namespace App\Mail;

use App\Models\Card;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CardAssigned extends Mailable
{
    use Queueable, SerializesModels;

    public $card;

    public function __construct(Card $card)
    {
        $this->card = $card;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'You have been assigned to a Card: ' . $this->card->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.card_assigned',
        );
    }
}
