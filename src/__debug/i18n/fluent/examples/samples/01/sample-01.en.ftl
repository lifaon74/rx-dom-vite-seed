# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} added {$photoCount ->
        [0] no new photo
        [one] a new photo
        *[other] {$photoCount} new photos
    } to {$userGender ->
        [male] his
        [female] her
        *[other] their
    } stream.

time-elapsed = Time elapsed: { NUMBER($duration, maximumFractionDigits: 0) }s.

log-time = Entry time: { DATETIME($date) }

list = This is my vehicles: { LIST($vehicles, "Motorcycle", "Bus", "Car", type: "disjunction" ) }.
# list = This is my vehicles: { OR($vehicles) }.
