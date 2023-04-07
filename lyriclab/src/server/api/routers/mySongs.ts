import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { SavedSong } from "@prisma/client";

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