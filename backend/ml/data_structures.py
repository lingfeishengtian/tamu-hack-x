from pydantic import BaseModel, Field

class Restaurant(BaseModel):
    id: int = Field(description="The unique identifier for the restaurant")
    name: str = Field(description="The name of the restaurant")
    rating: str = Field(description="The rating of the restaurant, usually as a string like '4.5 stars'")
    price_range: str = Field(description="The price range of the restaurant, represented in a format like '$$' or '$$$'")
    categories: list[str] = Field(description="A list of categories that describe the restaurant, such as ['Italian', 'Casual Dining']")
    location: str = Field(description="The physical location of the restaurant")
    review_snippet: str = Field(description="A short snippet from a review of the restaurant")
