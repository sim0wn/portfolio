import { allChallenges } from "contentlayer/generated"

export const allPlatforms = Array.from(
  new Set(
    allChallenges.map((challenge) =>
      challenge._raw.sourceFileDir.split("/").at(1),
    ),
  ),
)
