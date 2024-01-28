from pydantic import BaseModel, Field

class Item(BaseModel):
    id: int = Field(description="The unique identifier for the restaurant")
    link: str = Field(description="There will be a link attached somewhere in the file, find it and add it here")
    type: str = Field(description="One of [housing, flight, restaurant, entertainment]")
    name: str = Field(description="The name of the restaurant")
    rating: str = Field(description="The rating of the restaurant, usually as a string like '4.5 stars'")
    price: str = Field(description="The price of the flight or accomodation. Look for a number with $ in front of it")
    location: str = Field(description="The physical location of the restaurant")
    review_snippet: str = Field(description="A short snippet from a review of the restaurant")
    start: str = Field(description="The start date of the flight if classified")
    end: str = Field(description="The end date of the flight if classified")
    duration: str = Field(description="An approximate amount of time the activity will take")
