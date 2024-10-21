import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    authors: string;

    @Prop({ required: true })
    journalName: string;

    @Prop({ required: true })
    publicationYear: string;

    @Prop()
    volume: string;

    @Prop()
    issueNumber: string;

    @Prop()
    pages: string;

    @Prop({ required: true })
    doi: string;

    @Prop()
    keywords: string;

    @Prop()
    typeOfResearch: string;

    @Prop()
    abstract: string;

    @Prop()
    institution: string;

    @Prop({ type: Date })
    published_date: Date;

    @Prop()
    publisher: string;

    @Prop({ type: Date, default: Date.now })
    updated_date: Date;

    @Prop({ type: [Number], default: [] })
    ratings: number[];

    @Prop({ type: Number, default: 0 })
    averageRating: number;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ default: false })
    verified: boolean;

    @Prop({ type: Boolean, default: false })
    detailsExtracted: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);