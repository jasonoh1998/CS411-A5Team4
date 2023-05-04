import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { SavedSong } from "@prisma/client";

// this routes the current user saved songs to frontend

export const mySongsRouter = createTRPCRouter({
    getMySongs: protectedProcedure.query(async ({ ctx }) => {
        const userEmail = ctx.session.user.email;
        const mySongs = await ctx.prisma.savedSong.findMany({
        where: {
            userEmail: userEmail,
        },
        });
        return mySongs as SavedSong[];
    }),
});