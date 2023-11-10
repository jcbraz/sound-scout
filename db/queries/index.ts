'use server';

import { eq, and } from "drizzle-orm";
import { db } from "..";
import { user, playlist, feedback } from "../schema";
import type { InsertFeedback, InsertPlaylist, InsertUser, SelectPlaylist, SelectUser } from '../schema'

export async function getUser(id: number): Promise<SelectUser[] | null> {
    try {
        const user_query = await db.select().from(user).where(eq(user.id, id)) as SelectUser[];
        if (user_query.length === 0) return null;
        else return user_query;
    } catch (error) {
        console.error('Error getting user: ', error);
        return null;
    }
}

export async function getUserByEmail(email: string): Promise<SelectUser[] | null> {
    try {
        const user_query = await db.select().from(user).where(eq(user.email, email)) as SelectUser[];
        if (user_query.length === 0) return null;
        else return user_query;

    } catch (error) {
        console.error('Error getting user by email: ', error);
        return null;
    }
}

export async function getUserPlaylists(user_id: number): Promise<SelectPlaylist[] | null> {
    try {
        const user_playlists_query = await db.query.playlist.findMany({
            where: eq(playlist.user_id, user_id)
        }) as SelectPlaylist[];
        return user_playlists_query;
    } catch (error) {
        console.error('Error getting user playlists: ', error);
        return null;
    }
}

export async function addUser(user_values: InsertUser): Promise<number | null> {
    try {
        const user_insertion_response = await db.insert(user).values(user_values);
        if (user_insertion_response && user_insertion_response.insertId !== undefined)
            return +user_insertion_response.insertId;
        else
            throw new Error('Bad User insertion data!');
    } catch (error) {
        console.error('Error adding user: ', error);
        return null;
    }
}

export async function addPlaylist(playlist_values: InsertPlaylist): Promise<number | null> {
    try {
        const playlist_insertion_response = await db.insert(playlist).values(playlist_values);
        if (playlist_insertion_response && playlist_insertion_response.insertId !== undefined) {
            return +playlist_insertion_response.insertId;
        }
        else
            throw new Error('Bad Playlist insertion data!');
    } catch (error) {
        console.error('Error adding playlist: ', error);
        return null;
    }
}

export async function addFeedback(feedback_values: InsertFeedback): Promise<number | null> {
    try {
        const feedback_insertion_response = await db.insert(feedback).values(feedback_values);
        if (feedback_insertion_response && feedback_insertion_response.insertId !== undefined)
            return +feedback_insertion_response.insertId;
        else
            throw new Error('Bad Feedback insertion data!');
    } catch (error) {
        console.error('Error adding feedback: ', error);
        return null;
    }
}

export async function updatePlaylistPrompt(playlist_id: number, prompt: string): Promise<boolean> {
    try {
        const query = await db.update(playlist).set({
            prompt: prompt
        }).where(eq(playlist.id, playlist_id));
        console.log('query: ', query);
        if (query && query.rowsAffected === 1) return true;
        else throw new Error('Bad Playlist update data!');
    } catch (error) {
        console.error('Error updating playlist prompt: ', error);
        return false;
    }
}

export async function getUserCredits(user_id: number): Promise<number | undefined> {
    const credit_query = await db.select({
        credits: user.credits
    }).from(user).where(eq(user.id, user_id));
    const user_credits = credit_query.at(0)?.credits;
    if (user_credits === undefined) return undefined;
    else return user_credits;
}


export async function spendCredit(user_id: number, user_credits: number): Promise<boolean> {
    if (user_credits <= 0) return false;
    try {
        const creditsSpending = await db.update(user).set({
            credits: user_credits - 1
        }).where(eq(user.id, user_id));
        if (creditsSpending && creditsSpending.rowsAffected === 1) return true;
        else throw new Error('Bad User update data!');
    } catch (error) {
        console.error('Error updating database: ', error);
        return false;

    }
}

export async function addCredits(user_id: number, credit_amount: number): Promise<boolean> {
    const credit_query = await db.select({
        credits: user.credits
    }).from(user).where(eq(user.id, user_id));
    const user_credits = credit_query.at(0)?.credits;
    if (user_credits === undefined) return false;
    else {
        try {
            const creditsSpending = await db.update(user).set({
                credits: user_credits + credit_amount
            }).where(eq(user.id, user_id));
            if (creditsSpending && creditsSpending.rowsAffected === 1) return true;
            else throw new Error('Bad User update data!');
        } catch (error) {
            console.error('Error updating database: ', error);
            return false;
        }
    }
}

export async function checkIfPlaylistExists(prompt: string, userId: number): Promise<boolean> {
    try {
        const query = await db.select().from(playlist).where(and(eq(playlist.prompt, prompt), eq(playlist.user_id, userId)));
        if (query.length === 0) return false;
        else return true;
    } catch (error) {
        console.error('Error checking if playlist exists: ', error);
        return false;
    }
}