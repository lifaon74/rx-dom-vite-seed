# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} added {$photoCount ->
        [one] a new photo
       *[other] {$photoCount} new photos
    } to {$userGender ->
        [male] his
        [female] her
       *[other] their
    } stream.

